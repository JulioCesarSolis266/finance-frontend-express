// import { useEffect, useState } from "react";
// import type { Category } from "./categories.service";
// import categoryService from "./categories.service";
// import CategoryForm from "./CategoryForm";
// import Card from "../../shared/components/ui/Card";

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadCategories = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await categoryService.getAll();
//       setCategories(data);
//     } catch (err) {
//       console.error(err);
//       setError("Error al cargar las categorías");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await categoryService.remove(id);
//       setCategories((prev) => prev.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("No se pudo eliminar la categoría");
//     }
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6">
//         <p className="text-sm text-slate-500">Cargando categorías...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <p className="text-sm text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Título */}
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-900">Categorías</h1>
//         <p className="text-sm text-slate-500 mt-1">
//           Gestiona las categorías de ingresos y gastos
//         </p>
//       </div>

//       {/* Formulario */}
//       <Card>
//         <CategoryForm onCreated={loadCategories} />
//       </Card>

//       {/* Tabla */}
//       <Card>
//         {categories.length === 0 ? (
//           <p className="text-sm text-slate-500">
//             No hay categorías registradas.
//           </p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-4 py-3 font-medium text-slate-600">
//                     Nombre
//                   </th>
//                   <th className="px-4 py-3 font-medium text-slate-600">Tipo</th>
//                   <th className="px-4 py-3 font-medium text-slate-600">
//                     Acciones
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-200">
//                 {categories.map((c) => {
//                   const isIncome = c.type === "INCOME";

//                   return (
//                     <tr
//                       key={c.id}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-4 py-3 text-slate-900">{c.name}</td>

//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             isIncome
//                               ? "bg-green-100 text-green-700"
//                               : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {isIncome ? "Ingreso" : "Gasto"}
//                         </span>
//                       </td>

//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => handleDelete(c.id)}
//                           className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
//                         >
//                           Eliminar
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import type { Category } from "./categories.service";
// import categoryService from "./categories.service";
// import CategoryForm from "./CategoryForm";
// import Card from "../../shared/components/ui/Card";

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadCategories = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await categoryService.getAll();
//       setCategories(data);
//     } catch (err) {
//       console.error(err);
//       setError("Error al cargar las categorías");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await categoryService.remove(id);
//       setCategories((prev) => prev.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("No se pudo eliminar la categoría");
//     }
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6">
//         <p className="text-sm text-slate-500">Cargando categorías...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <p className="text-sm text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-900">Categorías</h1>
//         <p className="text-sm text-slate-500 mt-1">
//           Gestiona las categorías de ingresos y gastos
//         </p>
//       </div>

//       {/* Formulario */}
//       <Card>
//         <CategoryForm onCreated={loadCategories} />
//       </Card>

//       {/* Lista */}
//       <Card>
//         {categories.length === 0 ? (
//           <p className="text-sm text-slate-500">
//             No hay categorías registradas.
//           </p>
//         ) : (
//           <>
//             {/* MOBILE → Cards */}
//             <div className="space-y-3 sm:hidden">
//               {categories.map((c) => {
//                 const isIncome = c.type === "INCOME";

//                 return (
//                   <div
//                     key={c.id}
//                     className="border rounded-lg p-4 bg-white shadow-sm flex items-center justify-between"
//                   >
//                     <div className="space-y-1">
//                       <p className="font-medium text-slate-900">{c.name}</p>

//                       <span
//                         className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
//                           isIncome
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {isIncome ? "Ingreso" : "Gasto"}
//                       </span>
//                     </div>

//                     <button
//                       onClick={() => handleDelete(c.id)}
//                       className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
//                     >
//                       Eliminar
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* DESKTOP → Tabla */}
//             <div className="hidden sm:block overflow-x-auto">
//               <table className="min-w-full text-sm text-left">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-4 py-3 font-medium text-slate-600">
//                       Nombre
//                     </th>
//                     <th className="px-4 py-3 font-medium text-slate-600">
//                       Tipo
//                     </th>
//                     <th className="px-4 py-3 font-medium text-slate-600">
//                       Acciones
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-200">
//                   {categories.map((c) => {
//                     const isIncome = c.type === "INCOME";

//                     return (
//                       <tr
//                         key={c.id}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-4 py-3 text-slate-900">{c.name}</td>

//                         <td className="px-4 py-3">
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               isIncome
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {isIncome ? "Ingreso" : "Gasto"}
//                           </span>
//                         </td>

//                         <td className="px-4 py-3">
//                           <button
//                             onClick={() => handleDelete(c.id)}
//                             className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
//                           >
//                             Eliminar
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import type { Category } from "./categories.service";
import categoryService from "./categories.service";
import CategoryForm from "./CategoryForm";
import Card from "../../shared/components/ui/Card";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await categoryService.remove(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la categoría");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Cargando categorías...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Categorías
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Gestiona las categorías de ingresos y gastos
        </p>
      </div>

      {/* Formulario */}
      <Card>
        <CategoryForm onCreated={loadCategories} />
      </Card>

      {/* Tabla */}
      <Card>
        {categories.length === 0 ? (
          <p className="text-sm text-slate-500">
            No hay categorías registradas.
          </p>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full table-fixed text-xs sm:text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-slate-600 w-[45%]">
                    Nombre
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-slate-600 w-[30%]">
                    Tipo
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-slate-600 w-[25%] text-right">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {categories.map((c) => {
                  const isIncome = c.type === "INCOME";

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Nombre */}
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-slate-900 truncate">
                        {c.name}
                      </td>

                      {/* Tipo */}
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span
                          className={`inline-block text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                            isIncome
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {isIncome ? "Ingreso" : "Gasto"}
                        </span>
                      </td>

                      {/* Acción */}
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-[11px] sm:text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
