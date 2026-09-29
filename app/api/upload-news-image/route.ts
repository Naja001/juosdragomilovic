import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Slika nije pronađena.",
        },
        {
          status: 400,
        }
      );
    }

    const uploadForm = new FormData();

    uploadForm.append("image", image);

    const response = await fetch(
      "https://www.os-dragomilovic.com/api/upload-news-image.php",
      {
        method: "POST",
        body: uploadForm,
        cache: "no-store",
      }
    );

    const responseText = await response.text();

    console.log("CPANEL STATUS:", response.status);
    console.log("CPANEL RESPONSE:", responseText);

    let result: {
      success?: boolean;
      url?: string;
      message?: string;
    };

    try {
      result = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "cPanel nije vratio JSON odgovor.",
          response: responseText,
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
            "Greška prilikom uploada slike.",
        },
        {
          status: response.status,
        }
      );
    }

    if (!result.url) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Upload je završen, ali cPanel nije vratio URL slike.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
    });
  } catch (error) {
    console.error("Upload image error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Greška prilikom uploada slike.",
      },
      {
        status: 500,
      }
    );
  }
}