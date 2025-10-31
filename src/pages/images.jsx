import './images.css';

export default function Images() {
  const image = [
    "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
    "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
        "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525","https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
    "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525","https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
    "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",

    
  ];

  return (
    <div className="imagecontainer">
      {image.map((img, i) => (
        <div className="imagebox" key={i}>
          <img src={img} alt="Dog" className="image" />
        </div>
      ))}
    </div>
  );
}
