import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import Reviews from "@/components/Reviews";
import fetchSingleProduct, { Product } from "@/config/fetchSupabaseSingleProduct";


const SinglePage = async ({ searchParams }: { searchParams: any }) => {

  const productName = searchParams.productId || 1;

  const otherImages = [
    {
      id: 2,
      url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    }
  ]
  const { data: product, error: singleProdcutError } = await fetchSingleProduct(productName)
  const firstImg = {
    id: 1, url: product?.image_url
  }
  console.log(singleProdcutError)
  return (
    product ?
      (<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages
            items={[firstImg, ...otherImages]}
          />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">
            {product.name}
          </h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorum debitis vitae omnis perferendis voluptatem eos explicabo dolore eum! Nisi porro ullam soluta laborum necessitatibus repudiandae asperiores reiciendis sapiente deleniti!
          </p>
          <div className="h-[2px] bg-gray-100" />

          <h2 className="font-medium text-2xl">
            ${product.price}
          </h2>

          <div className="h-[2px] bg-gray-100" />
          <CustomizeProducts productId={product.id}
            variants={product.variants}
            inventory={product.inventory}
            category={product.category}
          />
          <div className="h-[2px] bg-gray-100" />
          {/* {product.additionalInfoSections?.map((section: any) => ( */}
          <div className="text-sm" //key={section.title}
          >
            <h4 className="font-medium mb-4">
              {/* {section.title} */}
              Title
            </h4>
            <p>
              {/* {section.description} */}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorum debitis vitae omnis perferendis voluptatem eos explicabo dolore eum! Nisi porro ullam soluta laborum necessitatibus repudiandae asperiores reiciendis sapiente deleniti!
            </p>
          </div>
          {/* // ))} */}
          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}
          {/* <h1 className="text-2xl">User Reviews</h1>
          <Suspense fallback="Loading...">
            <Reviews productId={product.id} />
          </Suspense> */}
        </div>
      </div>) : null
  );
};

export default SinglePage;
