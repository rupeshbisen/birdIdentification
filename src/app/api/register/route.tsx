import connectToDB from "@/database";
import User from "@/models/user.model";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
});


export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    await connectToDB();

    const { name, email,mobile, password, role } = await req.json();
    //validate the schema

    const { error } = schema.validate({ name, email,mobile, password, role });

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        });
    }

    try {
        //check if the user is exists or not

        const isUserAlreadyExists = await User.findOne({ email });

        if (isUserAlreadyExists) {
            return NextResponse.json({
                success: false,
                message: "User is already exists. Please try with different email.",
            });
        } else {
            const hashPassword = await hash(password, 12);

            const newlyCreatedUser = await User.create({
                name,
                email,
                mobile,
                password: hashPassword,
                role,
            });

            if (newlyCreatedUser) {
                return NextResponse.json({
                    success: true,
                    message: "Account created successfully.",
                });
            }
        }
    } catch (error) {
        console.log("Error while new user registration. Please try again", error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}