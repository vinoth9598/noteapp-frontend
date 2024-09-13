
const LoginForm = ({loginFormData,setLoginFormData,isRegistered,setIsRegistered, user,setUser,token,setToken})=>{

    const handleLogin = async (e)=>{
        e.preventDefault();

        console.log('Loggin in user..');
        const response = await fetch('https://notesapp-backend-nbdx.onrender.com/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginFormData)
        });

        const data = await response.json();

        if(response.status === 200){
            console.log('user logged in successfully..');
            console.log(data);
            setLoginFormData({
                username:"",
                password:""
            });

            setToken(data.token);
            setUser(data);

            window.localStorage.setItem('token',data.token);
            window.localStorage.setItem('user',JSON.stringify(data));

        }else{
            console.log("Error logging in user");
            console.log(data);
        }

    }
    return (
        <div className="login">
            <h3><marquee>Login User</marquee></h3>
            <form onSubmit={handleLogin}>
               <div className="inp">
                    <input
                        type="email"
                        placeholder="Email.."
                        value={loginFormData.username}
                        onChange={(e)=>setLoginFormData({...loginFormData, username:e.target.value})}
                        required
                    />

               </div>
               <div className="inp">
                    <input
                        type="password"
                        placeholder="Password.."
                        value={loginFormData.password}
                        onChange={(e)=>setLoginFormData({...loginFormData, password:e.target.value})}
                        required
                    />
               </div>
               <button type="submit">Login</button>
            </form>
            <p>Not Register ? <button onClick={()=>setIsRegistered(false)}>Register</button></p>
        </div>
    )
}

export default LoginForm;