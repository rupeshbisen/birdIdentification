
export const getAllAdminProducts = async (fileName:string) => {
    try {
        const res = await fetch(`/api/all-products?fileName=${fileName}`, {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};
