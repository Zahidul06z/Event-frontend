
const useUserLogout = ({user,logout}) => {
    const handleClik = async()=>{
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `${user?.token}`
                },
                
            });
            const data = await res.json();

            if (data.error) {
                console.log(data.error)
                return;
            }
            logout()
        } catch (error) {
            console.log("Error", error, "error")
        }
    }
  return handleClik
}

export default useUserLogout
