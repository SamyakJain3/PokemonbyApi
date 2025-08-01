import image from '../../assets/banner.jpg'
const Banner = () => {
  return (
    <div>
        <div className='w-full h-[500px] '>
      <img 
       src={image} 
       alt="Banner"
       className='w-full h-[100%] object-cover' 
       />
       </div>
        <div className='absolute top-20 align-middle text-white text-center  w-full'>
            <h1 className='text-3xl font-bold'>
                 Crypto Tracker
            </h1>
            <p className='text-xl'>
                this website contain all the currency information 
            </p>
        </div> 
    </div>
  )
}

export default Banner
