import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const image =
      formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Slika nije pronađena.",
        },
        {
          status: 400,
        }
      );
    }

    const uploadForm =
      new FormData();

    uploadForm.append(
      "image",
      image
    );

    const response = await fetch(
      "https://www.os-dragomilovic.com/api/upload-gallery-image.php",
      {
        method: "POST",
        body: uploadForm,
        cache: "no-store",
      }
    );

    const responseText =
      await response.text();

    let result;

    try {
      result =
        JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "cPanel nije vratio JSON odgovor.",
        },
        {
          status: 500,
        }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            result.message ??
            "Upload slike nije uspio.",
        },
        {
          status:
            response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
    });
  } catch (error) {
    console.error(
      "GALLERY UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Upload slike nije uspio.",
      },
      {
        status: 500,
      }
    );
  }
}