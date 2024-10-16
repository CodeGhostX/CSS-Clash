import { NextResponse } from "next/server"

const jsonData = {
  challanges: [
    {
      id: 1,
      title: "Japan Image",
      description: "This challenge represents an image of Japan. Your task is to create a layout or design that reflects this title, focusing on coding a visual representation."
    },
    {
      id: 2,
      title: "Hollow Ring",
      description: "This challenge involves creating a visual for a hollow ring. The objective is to use your coding skills to bring this abstract concept to life in a graphical format."
    },
    {
      id: 3,
      title: "L Shaped",
      description: "This challenge is about building an L-shaped structure. Your task is to use your coding skills to create this specific shape in the layout or design."
    }
  ]
};

export const GET = async ()=>{
  return NextResponse.json(jsonData);
}