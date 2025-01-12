// import Layout from "@/components/Layout";
// import {useEffect, useState} from "react";
// import axios from "axios";
// import { withSwal } from 'react-sweetalert2';

// function Categories({swal}) {
//   const [editedCategory, setEditedCategory] = useState(null);
//   const [name,setName] = useState('');
//   const [parentCategory,setParentCategory] = useState('');
//   const [categories,setCategories] = useState([]);
//   const [properties,setProperties] = useState([]);
//   useEffect(() => {
//     fetchCategories();
//   }, [])
//   function fetchCategories() {
//     axios.get('/api/categories').then(result => {
//       setCategories(result.data);
//     });
//   }
//   async function saveCategory(ev){
//     ev.preventDefault();
//     const data = {
//       name,
//       parentCategory,
//       properties:properties.map(p => ({
//         name:p.name,
//         values:p.values.split(','),
//       })),
//     };
//     if (editedCategory) {
//       data._id = editedCategory._id;
//       await axios.put('/api/categories', data);
//       setEditedCategory(null);
//     } else {
//       await axios.post('/api/categories', data);
//     }
//     setName('');
//     setParentCategory('');
//     setProperties([]);
//     fetchCategories();
//   }
//   function editCategory(category){
//     setEditedCategory(category);
//     setName(category.name);
//     setParentCategory(category.parent?._id);
//     setProperties(
//       category.properties.map(({name,values}) => ({
//       name,
//       values:values.join(',')
//     }))
//     );
//   }
//   function deleteCategory(category){
//     swal.fire({
//       title: 'Are you sure?',
//       text: `Do you want to delete ${category.name}?`,
//       showCancelButton: true,
//       cancelButtonText: 'Cancel',
//       confirmButtonText: 'Yes, Delete!',
//       confirmButtonColor: '#d55',
//       reverseButtons: true,
//     }).then(async result => {
//       if (result.isConfirmed) {
//         const {_id} = category;
//         await axios.delete('/api/categories?_id='+_id);
//         fetchCategories();
//       }
//     });
//   }
//   function addProperty() {
//     setProperties(prev => {
//       return [...prev, {name:'',values:''}];
//     });
//   }
//   function handlePropertyNameChange(index,property,newName) {
//     setProperties(prev => {
//       const properties = [...prev];
//       properties[index].name = newName;
//       return properties;
//     });
//   }
//   function handlePropertyValuesChange(index,property,newValues) {
//     setProperties(prev => {
//       const properties = [...prev];
//       properties[index].values = newValues;
//       return properties;
//     });
//   }
//   function removeProperty(indexToRemove) {
//     setProperties(prev => {
//       return [...prev].filter((p,pIndex) => {
//         return pIndex !== indexToRemove;
//       });
//     });
//   }
//   return (
//     <Layout>
//       <h1>Categories</h1>
//       <label>
//         {editedCategory
//           ? `Edit category ${editedCategory.name}`
//           : 'Create new category'}
//       </label>
//       <form onSubmit={saveCategory}>
//         <div className="flex gap-1">
//           <input
//             type="text"
//             placeholder={'Category name'}
//             onChange={ev => setName(ev.target.value)}
//             value={name}/>
//           <select
//                   onChange={ev => setParentCategory(ev.target.value)}
//                   value={parentCategory}>
//             <option value="">No parent category</option>
//             {categories.length > 0 && categories.map(category => (
//               <option key={category._id} value={category._id}>{category.name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-2">
//           <label className="block">Properties</label>
//           <button
//             onClick={addProperty}
//             type="button"
//             className="btn-default text-sm mb-2">
//             Add new property
//           </button>
//           {properties.length > 0 && properties.map((property,index) => (
//             <div key={property.name} className="flex gap-1 mb-2">
//               <input type="text"
//                      value={property.name}
//                      className="mb-0"
//                      onChange={ev => handlePropertyNameChange(index,property,ev.target.value)}
//                      placeholder="property name (example: color)"/>
//               <input type="text"
//                      className="mb-0"
//                      onChange={ev =>
//                        handlePropertyValuesChange(
//                          index,
//                          property,ev.target.value
//                        )}
//                      value={property.values}
//                      placeholder="values, comma separated"/>
//               <button
//                 onClick={() => removeProperty(index)}
//                 type="button"
//                 className="btn-red">
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-1">
//           {editedCategory && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditedCategory(null);
//                 setName('');
//                 setParentCategory('');
//                 setProperties([]);
//               }}
//               className="btn-default">Cancel</button>
//           )}
//           <button type="submit"
//                   className="btn-primary py-1">
//             Save
//           </button>
//         </div>
//       </form>
//       {!editedCategory && (
//         <table className="basic mt-4">
//           <thead>
//           <tr>
//             <td>Category name</td>
//             <td>Parent category</td>
//             <td></td>
//           </tr>
//           </thead>
//           <tbody>
//           {categories.length > 0 && categories.map(category => (
//             <tr key={category._id}>
//               <td>{category.name}</td>
//               <td>{category?.parent?.name}</td>
//               <td>
//                 <button
//                   onClick={() => editCategory(category)}
//                   className="btn-default mr-1"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteCategory(category)}
//                   className="btn-red">Delete</button>
//               </td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
//       )}
//     </Layout>
//   );
// }

// export default withSwal(({swal}, ref) => (
//   <Categories swal={swal} />
// ));
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import { ReactSortable } from "react-sortablejs";
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [images, setImages] = useState([]); // New state for images
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
      images, // Add images to the category data
    };
    // if (editedCategory) {
    //   data._id = editedCategory._id;
    //   await axios.put("/api/categories", data);
    //   setEditedCategory(null);
    // } else {
    //   await axios.post("/api/categories", data);
    // }

    try {
      if (editedCategory) {
        // Update category
        data._id = editedCategory._id;
        await axios.put("/api/categories", data);
        setEditedCategory(null);
      } else {
        // Create new category
        await axios.post("/api/categories", data);
      }
    
      // Clear the form after successful submission
      setName("");
      setParentCategory("");
      setProperties([]); 
      setImages([]); // Clear images after saving
      fetchCategories();
    } catch (error) {
      // Handle errors
      console.error("Error saving category:", error);
      alert("There was an error saving the category. Please try again.");
    
      // Optionally, you could display the error in a user-friendly way (e.g., using a modal or toast notification)
    }
    
    // setName("");
    // setParentCategory("");
    // setProperties([]);
   
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
    setImages(category.images || []); // Set images from the edited category
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      try {
        const res = await axios.post("/api/upload", data);
        setImages((oldImages) => {
          return [...oldImages, ...res.data.links];
        });
      } catch (error) {
        console.error("Error uploading images:", error);
        alert("There was an issue uploading the images. Please try again.");
      }
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory ? `Edit category ${editedCategory.name}` : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select onChange={(ev) => setParentCategory(ev.target.value)} value={parentCategory}>
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block">Properties</label>
          <button onClick={addProperty} type="button" className="btn-default text-sm mb-2">
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={property.name} className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)}
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  value={property.values}
                  placeholder="values, comma separated"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>

        <div className="mb-2">
          <label>Category Photos</label>
          <div className="mb-2 flex flex-wrap gap-1">
            <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
              {!!images?.length &&
                images.map((link) => (
                  <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                    <img src={link} alt="" className="rounded-lg" />
                  </div>
                ))}
            </ReactSortable>
            {isUploading && (
              <div className="h-24 flex items-center">
                <Spinner />
              </div>
            )}
            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <div>Add image</div>
              <input type="file" onChange={uploadImages} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
                setImages([]); // Clear images on cancel
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>

      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-default mr-1"
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteCategory(category)} className="btn-red">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
