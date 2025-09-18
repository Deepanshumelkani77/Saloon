import React from 'react'
import { useParams } from 'react-router-dom';

const Show = () => {


    const { id } = useParams(); // Get the dynamic ID from the URL
 const [data, setData] = useState([]);
  useEffect(() => {
     fetchHairProducts();
   }, []);

  const fetchHairProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:1000/show/${id}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError('Failed to fetch hair products');
      }
    } catch (err) {
      console.error('Error fetching hair products:', err);
      setError('Failed to load hair products');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      
    </div>
  )
}

export default Show
