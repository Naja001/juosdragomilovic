import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Dokument nije pronađen.",
        },
        {
          status: 400,
        }
      );
    }

    const uploadForm =
      new FormData();

    uploadForm.append(
      "file",
      file
    );

    const response = await fetch(
      "https://www.os-dragomilovic.com/api/upload-document.php",
      {
        method: "POST",
        body: uploadForm,
        cache: "no-store",
      }
    );

    const text =
      await response.text();

    let result;

    try {
      result =
        JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "cPanel nije vratio ispravan odgovor.",
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
            "Upload dokumenta nije uspio.",
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
      fileName:
        result.fileName,
    });
  } catch (error) {
    console.error(
      "DOCUMENT UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Upload dokumenta nije uspio.",
      },
      {
        status: 500,
      }
    );
  }
}