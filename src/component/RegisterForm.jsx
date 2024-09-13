import "./style/register.css";

const RegisterForm = ({formUserDetails,setFormUserDetails,isRegistered,setIsRegistered})=>{

    const handleRegister = async(e)=>{
        e.preventDefault();

        const registerBody = {
            username : formUserDetails.username,
            name : formUserDetails.name,
            password : formUserDetails.password
        };

        console.log("Registering user...");
        const response = await fetch('https://notesapp-backend-nbdx.onrender.com/users',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(registerBody)
        });

        const data = await response.json();

        if(response.status === 200){
            console.log("user created successfully");
            console.log(data);
            setFormUserDetails({
                username:"",
                name:"",
                password:""
            });
            setIsRegistered(true);
        
        }else{
            console.log("Error creating user");
            console.log(data);
        }

    }

    return (
        <div className="register">
            <h3><marquee>Register User</marquee></h3>
            <form onSubmit={handleRegister}>
                <div className="inp">
                    <input
                        type="email"
                        placeholder="Email.."
                        value={formUserDetails.username}
                        onChange={(e)=> setFormUserDetails({...formUserDetails,username:e.target.value})}
                        required
                    />
                </div>
                <div className="inp">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formUserDetails.name}
                        onChange={(e)=> setFormUserDetails({...formUserDetails, name:e.target.value})}
                        required

                    />
                </div>
                <div className="inp">
                    <input
                        type="password"
                        placeholder="Password"
                        value={formUserDetails.password}
                        onChange={(e)=>setFormUserDetails({...formUserDetails, password:e.target.value})}
                        required
                    />
                </div>
                <button type="submit"> Register</button>
            </form>
            <p>Already Register ? <button onClick={()=> setIsRegistered(true)}>Login</button></p>
        </div>
    )
}

export default RegisterForm;