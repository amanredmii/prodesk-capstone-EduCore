import RightPanel from "./RightPanel";
import leftPanel from "./leftpanel.png";

function Login() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex">


                <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-blue-50">
                    <img
                        src={leftPanel}
                        alt="Login"
                        className="max-h-[800px] w-auto object-contain"
                    />
                </div>

                <RightPanel />

            </div>
        </div>
    );
}

export default Login;