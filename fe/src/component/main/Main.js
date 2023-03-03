import React,{useState} from 'react'
import axios from "axios"
import "./main.css"

export default function Main() {
    const[image,setimage] = useState(null)
    const[respstatus,setrespstatus]= useState(false)
    const[imgurl,setimgurl] = useState("")
    const[output,setoutput]=useState(null)
  return (
    <div className='fileInput'>
        <div className='navbar'>
            <h1 style={{textAlign:"center"}}>Automated Skin Cancer Detection</h1>

        </div>
        <center>
        <form>
            
            {/* <input class="choosephoto" type="file" style={{marginBottom:"30px",display:"none"}} onChange={(e)=>{
                setimage(e.target.files[0]);
                let reader = new FileReader();
                let file = e.target.files[0];

                reader.onloadend = () => {
                    setimgurl(reader.result);
                }

            reader.readAsDataURL(file)
                

            }}/>
            <label for="file" style={{fontSize:"20px"}}>Upload Image</label> */}
            <input type="file" id="file" accept="image/png, image/gif, image/jpeg" placeholder='UPLOAD IMAGE' style={{      
            display:"none"}} 
            onChange={(e)=>{
                setimage(e.target.files[0]);
                let reader = new FileReader();
                let file = e.target.files[0];

                reader.onloadend = () => {
                    setimgurl(reader.result);
                }
                reader.readAsDataURL(file)

            }}
             required/>
                <label for="file"  style={{
                        backgroundColor:"white",
                        border: "dotted 2px green",
                        borderRadius: "5px",
                        padding: "7px",
                        marginTop: '20px',
                        cursor: "pointer",
                        justifyContent: "center",                        
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "30px",
                    }}><i className='fas fa-image text-center' style={{color:"green"}}/> UPLOAD IMAGE</label>
               

            <br/>
            {imgurl && <img className="inputimage" style={{
                marginTop:"20px",
            }} src={imgurl} alt="uploaded file" />}
            <br/>
            <span id='result-error' style={{color:'red',fontSize:'30px'}}></span>
            <br/>
            <button className="button-27" onClick={(e)=>{
                e.preventDefault();
                setrespstatus(false)
                console.log(image)
                const data = new FormData();
                data.append("image", image);
                axios.post("http://localhost:5000/predict",
                data)
                .then((res)=>{
                    console.log(res)
                    setrespstatus(true)
                    setoutput(res.data)

                })
                .catch((err)=>{
                    document.getElementById("result-error").innerHTML = "Error Occured!!!"
                })
            }}>Predict</button>
        </form>
        </center>

        {respstatus && <div className='result'>
             <h2  style={{textAlign:"center"}}>RESULT</h2>
             
            <div id="output">
                <ul>
                    <li style={{color:"red",fontSize:"20px"}}>
                    <span style={{color:"black"}}>Disease Detected </span>
                    {output.Disease_Name.toUpperCase()}
                    </li>
                    { output.Disease_Name !== "Not Found" &&
                    <>
                    <hr/>
                    <li>
                    <span style={{fontSize:"20px", color:"blue"}}>Description</span><br/>{output.Description}
                    </li>
                    <hr/>
                    <li>
                       <span style={{fontSize:"20px", color:"blue"}}>Causes</span><br/> {output.Causes}
                    </li>
                    <hr/>
                    <li>
                        <span style={{fontSize:"20px", color:"blue"}}>Risk Factors</span><br/>{output.RiskFactors}
                    </li>
                    <ht/>
                    <li>
                        <span style={{fontSize:"20px", color:"blue"}}>Diagnosis</span><br/>{output.Diagnosis}
                    </li>
                    <hr/>
                    <li>
                        <span style={{fontSize:"20px", color:"blue"}}>Treatment</span><br/>{output.Treatment}
                    </li>
                    <hr/>
                    <li>
                        <span style={{fontSize:"20px", color:"blue"}}>Prevention</span><br/>{output.Prevention}
                    </li>  
                    </> 
                    }
                    
                </ul>
            </div>
        </div>}
        <br/>
    </div>
  )
}
