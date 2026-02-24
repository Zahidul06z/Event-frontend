import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../usercontext/AuthContext'

const useGetCodProduct = (id) => {
  const [orderProduct, setOrderProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const getOrderProduct = async () => {
      try {
        const res = await fetch(`https://event-backend-dx9k.vercel.app/api/orders/successcod/${id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user?.token}`,
          },
        })

        const data = await res.json()

        if (data.error) {
          setError(data.error)
          return
        }

        setOrderProduct(data.orderProduct)

      } catch (err) {
        setError(`Fetch error: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    if (user?.token && id) {
      getOrderProduct()
    }

  }, [id, user?.token]) // ✅ No dependency on orderProduct!

  return { loading, orderProduct, error }
}

export default useGetCodProduct
