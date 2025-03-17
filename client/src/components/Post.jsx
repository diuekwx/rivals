import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import template from '../assets/template1.png';
import html2canvas from 'html2canvas-pro';
import domtoimage from 'dom-to-image-more';
import HeroGallery from "./HeroSelect";
import templatetwo from '../assets/template2.png'


export default function Post(){
    const [heroColor, setHeroColor] = useState("#000000");
    const [form, setForm] = useState({
        user: "",
        description: "",
        // hero:"",
    });

    const params = useParams();
    const navigate = useNavigate();
    const postContainerRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            const response = await fetch(
                `http://localhost:5050/post/${id}`
            );
            if (!response.ok){
                const message = `An error has occured: ${response.statusText}`; 
                console.log(message);
            }
            const post = await response.json();
            if (!post){
                console.warn(`Post with id ${id} not found`);
                navigate("/");
                return;
            }
            fetchData();
            return;
        }
    }, [params.id, navigate]);

    function updateForm(value){
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function onSubmit(e){
        e.preventDefault();

        await document.fonts.ready;
        // const canvas = await html2canvas(postContainerRef.current, {
        //   useCORS: true,
        //   allowTaint: true
        // });
        // const imageData = canvas.toDataURL('image/png');

        const dataUrl = await domtoimage.toPng(postContainerRef.current, {
          quality: 0.95,
          bgcolor: null,
          style: {
              'border-radius': '0',
              'border': 'none'
          },
      });
        
        try{
            const postData = {
              user: form.user,
              description: form.description,
              // hero: form.hero,
              //imageData
              postImage: dataUrl
            };
            console.log(postData);
            const response = await fetch("http://localhost:5050/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });
                if (!response.ok){
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json();
              console.log("Server response:", result);
    
            }
        catch (error){
            console.error('Problem in fetch operation, ', error);
        }
        finally{
          //hero
            setForm({
                user: "", description: ""
            });
            navigate("/");
        }
        
    }
    // TODO: Change submit button
    // TODO: change axis of the template
    return (
      <div>
          <h1 className="text-center text-[36px] font-medium text-black">
            Submit a Post
          </h1>
          <div className="pt-16 px-4 flex flex-col-2 items-center justify-center">
          <form onSubmit={onSubmit} className="flex flex-col items-center">
            {/* Post container */}
            <div  ref={postContainerRef} className="w-[440px] h-[496px] max-w-md relative overflow-hidden shadow-xl mb-6 text-center border-none">
              {/* Background image div */}
              <div 
                className="absolute inset-0 bg-cover bg-center z-5" 
                style={{
                  backgroundImage: `url(${templatetwo})`,
                }}
              ></div>
              
              {/* Content container - positioned on top of the background */}
              <div className="relative z-10 h-full flex flex-col border-none">
                <div className="pt-[0.5px] pb-3 px-6 border-none">
                  <label htmlFor="user" className="text-gray-700 mb-1 font-medium justify-center border-none">To: </label>
                  <input
                    type="text"
                    id="user"
                    placeholder="Enter username..."
                    value={form.user}
                    onChange={(e) => updateForm({user: e.target.value})}
                    required
                    className="bg-transparent outline-none justify-center text-gray-800 border-none"
                  />
                </div>
                
                <div className="flex-1 px-7 pb-8 mx-6 mb-5 flex flex-col border-none" style={{backgroundColor: heroColor}}>
                  {console.log(heroColor)}
                  <label htmlFor="description" className="text-gray-700 mb-1 font-medium border-none" ></label>
                  <textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => updateForm({description: e.target.value})}
                    required
                    className="flex-1 text-[40px] px-1 text-white resize-none h-full outline-none border-none"
                    placeholder="Type Your Message Here..."
                  />
                </div>
              </div>
            </div>
            
            {/* Submit button - now outside the post container */}
            <button 
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-md transition duration-200"
            >
              Submit
            </button>
          </form>
          <HeroGallery setColor={setHeroColor}/>
        </div>
      </div>
      
  );
}