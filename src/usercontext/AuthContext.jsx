import { createContext,  useCallback,  useEffect,  useState} from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    // Load user from localStorage when app starts
    const storedUser = localStorage.getItem('token');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [getProduct, setGetProduct] = useState(() => {
    // Load product from localStorage when app starts
    const storeProduct = localStorage.getItem('product');
    return storeProduct ? JSON.parse(storeProduct) : null;
  });

  const [resentView, setResentView] = useState(() => {
    // Load product from localStorage when app starts
    const storeProduct = localStorage.getItem('recentView');
    return storeProduct ? JSON.parse(storeProduct) : null;
  });

  const [addWishList, setAddWishList] = useState(() => {
    // Load product from localStorage when app starts
    const storeProduct = localStorage.getItem('wishlist');
    return storeProduct ? JSON.parse(storeProduct) : null;
  });

  //user login
  const login = (data) => {
    const newUser = data;
    setUser(newUser);
    localStorage.setItem('token', JSON.stringify(newUser));
  };

  //User logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };


  //Add product in cart
  const setProduct = (data) => {
    const existingCart = JSON.parse(localStorage.getItem('product')) || [];
    const alreadyExists = existingCart.some(item => item._id === data._id);
    if(alreadyExists){
      return {status : 'alredyexist', message : 'Product already added to cart'}
    }else if(!alreadyExists) {
      const updatedCart = [...existingCart, data];
      setGetProduct(updatedCart);
      localStorage.setItem('product', JSON.stringify(updatedCart));
      return {status : 'success' , message : 'Product added to cart successfully'};
    }
  };

  //remove product from cart
  const removeProduct = () => {
    setGetProduct(null);
    localStorage.removeItem('product');
  };

  //remove single product from cart
  const removeSingleProduct = (id) => {
    const cartItem = JSON.parse(localStorage.getItem('product')) || [];
    const updatedCart = cartItem.filter(item => item._id !== id);

    setGetProduct(updatedCart);
    localStorage.setItem('product', JSON.stringify(updatedCart));
  };

  //product quantity increase
  const increaseQuantity = (id) => {
    const cart = JSON.parse(localStorage.getItem('product')) || [];

    const updatedCart = cart.map(item => {
      if (item._id === id) {
        const newQuantity = item.quntity  + 1
        return {
          ...item,
          quntity : newQuantity,
        totalPrice : item.totalPrice + item.price,
        
        };
      }
      return item;
      

    });

    setGetProduct(updatedCart);
    
    localStorage.setItem('product', JSON.stringify(updatedCart));
  };

  // product quantity decrease
  const decreaseQuantity = (id) => {
    const cart = JSON.parse(localStorage.getItem('product')) || [];

    const updatedCart = cart.map(item => {
      if (item._id === id && item.quntity > 0) {
        const newQuantity = item.quntity - 1;
        return {
          ...item,
        quntity: newQuantity,
        totalPrice : item.totalPrice - item.price,
        };
      }
      return item;
    });

    setGetProduct(updatedCart);
    localStorage.setItem('product', JSON.stringify(updatedCart));
  };

  //add recent viewed product
  const addRecentView = (data) => {

    // prevent invalid data
    if (!data || !data._id) return; 

    const existingViews = JSON.parse(localStorage.getItem('recentView')) || [];
    // Check if the product already exists
    const alreadyExists = existingViews.some(item => item._id === data._id);
     
    if(!alreadyExists) {
     const updatedViews = [...existingViews, { ...data, viewedAt: Date.now() }].slice(-10);
      setResentView(updatedViews);
      localStorage.setItem('recentView', JSON.stringify(updatedViews));
    }
  };

  //remove recent viewed product 
  const getValidRecentViews = () => {
    const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const stored = JSON.parse(localStorage.getItem('recentView')) || [];

    // Filter out views older than 5 days
    const validViews = stored.filter(item => now - item.viewedAt < FIVE_DAYS);

    // Sort by viewedAt DESC (newest first)
    validViews.sort((a, b) => b.viewedAt - a.viewedAt);


    // Update localStorage with cleaned list
    localStorage.setItem('recentView', JSON.stringify(validViews));

    return validViews;
  };

  useEffect(() => {
    const validViews = getValidRecentViews();
    setResentView(validViews);
  }, []);

  // add wish List
  const addWishLists = (data) => {

    // prevent invalid data
    if (!data || !data._id) return; 

    const existingViews = JSON.parse(localStorage.getItem('wishlist')) || [];
    // Check if the product already exists
    const alreadyExists = existingViews.some(item => item._id === data._id);
    if(alreadyExists){
      const removeAlreadyExists = existingViews.filter(item=>item._id !== data._id)
      localStorage.setItem('wishlist', JSON.stringify(removeAlreadyExists));
      setAddWishList(removeAlreadyExists);
    }
    else if(!alreadyExists) {
     const updatedViews = [...existingViews, { ...data, viewedAt: Date.now() }];
      localStorage.setItem('wishlist', JSON.stringify(updatedViews));
      setAddWishList(updatedViews);
    }
  };

  const getWishList = () => {
    const FIVE_DAYS = 15 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Filter out views older than 15 days
    const validViews = stored.filter(item => now - item.viewedAt < FIVE_DAYS);

    // Sort by viewedAt DESC (newest first)
    validViews.sort((a, b) => b.viewedAt - a.viewedAt);


    // Update localStorage with cleaned list
    localStorage.setItem('wishlist', JSON.stringify(validViews));

    return validViews;
  };

  // Remove wishlist single item

  const removeWishListItem = (id) =>{
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const updatedWishList = wishlist.filter(item => item._id !== id);

    localStorage.setItem('wishlist', JSON.stringify(updatedWishList));

    setAddWishList(updatedWishList);
  }

  useEffect(() => {
    const validViews = getWishList();
    setAddWishList(validViews);
   
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout,getProduct,setProduct,removeProduct,removeSingleProduct,decreaseQuantity,increaseQuantity,addRecentView,resentView,addWishLists,addWishList,removeWishListItem  }}>
      {children}
    </AuthContext.Provider>
  );
};