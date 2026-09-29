import {
  NextResponse,
} from "next/server";

import {
  adminAuth,
  adminDb,
} from "@/lib/firebase-admin";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  request: Request,
  {
    params,
  }: RouteProps
) {
  try {
    const authorization =
      request.headers.get(
        "authorization"
      );

    if (
      !authorization ||
      !authorization.startsWith(
        "Bearer "
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Niste autorizovani.",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      authorization.replace(
        "Bearer ",
        ""
      );

    await adminAuth.verifyIdToken(
      token
    );

    const {
      id,
    } = await params;

    const documentReference =
      adminDb
        .collection("documents")
        .doc(id);

    const snapshot =
      await documentReference.get();

    if (!snapshot.exists) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Dokument nije pronađen.",
        },
        {
          status: 404,
        }
      );
    }

    const data =
      snapshot.data();

    const fileUrl =
      typeof data?.fileUrl ===
        "string"
        ? data.fileUrl
        : "";

    if (fileUrl) {
      const deleteResponse =
        await fetch(
          "https://www.os-dragomilovic.com/api/delete-document.php",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                fileUrl,
              }),

            cache:
              "no-store",
          }
        );

      const responseText =
        await deleteResponse.text();

      console.log(
        "DOCUMENT CPANEL DELETE:",
        responseText
      );

      if (!deleteResponse.ok) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Fajl nije mogao biti obrisan sa cPanela.",
          },
          {
            status: 500,
          }
        );
      }
    }

    await documentReference.delete();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DOCUMENT DELETE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Dokument nije mogao biti obrisan.",
      },
      {
        status: 500,
      }
    );
  }
}