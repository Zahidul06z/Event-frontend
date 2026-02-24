
const useFilter = (setProducts,setToggle,setError) => {
    const handleFilter =async(value)=>{
        try {
            const res = await fetch(`https://event-backend-dx9k.vercel.app/api/products//filter/product?first=${value.first}&second=${value?.second}`, {
                method: "POST",
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error)
                setProducts('')
                setToggle(false)
                return;
            }
            setProducts(data)
            setError('')
            setToggle(false)
        } catch (error) {
            setError("Error", error.message, "error");
        }
    }

    return handleFilter 
}

export default useFilter
