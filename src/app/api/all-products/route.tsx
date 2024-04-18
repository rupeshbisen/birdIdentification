import connectToDB from "@/database";
import Bird from "@/models/bird.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(Request: Request) {
    try {
        await connectToDB();
        const { searchParams } = new URL(Request.url);
        const fileName = searchParams.get('fileName');

        const extractAllproducts = await Bird.find({ "fileUrl": { $regex: '.*' + fileName + '.*' } });
        if (extractAllproducts) {
            let audioUrl = ''
            let birdName = ''
            let imagesUrl = '';
            extractAllproducts.map((product) => {
                const contactUs = product.fileUrl.includes(fileName)
                if (contactUs) {
                    audioUrl = product.fileUrl
                    birdName = product.fileName
                    imagesUrl = product.imagesUrl
                }
            })
            const data = {
                audioUrl: audioUrl,
                fileName: birdName,
                "imagesUrl": imagesUrl
            };
            console.log("data...",data);
            return NextResponse.json({
                success: true,
                data
            });
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No bird found !",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Somthing went wrong ! Plaese try again later",
        });

    }
}

