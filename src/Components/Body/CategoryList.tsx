import React from "react";
import Footer from "../Footer";
import { useMyContextState } from "../../Context";

const CategoryList = () => {

    const {data} = useMyContextState()

    return (
        <div className="mt-2">
            <div className="mx-3">
            {
                data.categories.map((catg) => {
                 return ( 
                     <p 
                 key={catg.name}
                 className="text-sky-400 font-bold px-4 py-1 border-b-2 border-sky-400 h-10"
                 >
                    {catg.name}
                    </p>
                    )
                })
            }
            </div>
            <Footer activeTab={'Category'} />
        </div>
    )
}

export default CategoryList