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
    /*
     * Auth
     */
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

    /*
     * Firestore document
     */
    const documentReference =
      adminDb
        .collection("gallery")
        .doc(id);

    const snapshot =
      await documentReference.get();

    if (!snapshot.exists) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Fotografija nije pronađena.",
        },
        {
          status: 404,
        }
      );
    }

    const data =
      snapshot.data();

    const imageUrl =
      typeof data?.imageUrl ===
        "string"
        ? data.imageUrl
        : "";

    /*
     * Obriši sliku sa cPanela
     */
    if (imageUrl) {
      const deleteResponse =
        await fetch(
          "https://www.os-dragomilovic.com/api/delete-gallery-image.php",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                imageUrl,
              }),

            cache:
              "no-store",
          }
        );

      const responseText =
        await deleteResponse.text();

      console.log(
        "GALLERY CPANEL DELETE:",
        responseText
      );

      if (
        !deleteResponse.ok
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Slika nije mogla biti obrisana sa cPanela.",
          },
          {
            status: 500,
          }
        );
      }
    }

    /*
     * Obriši Firestore dokument
     */
    await documentReference.delete();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "GALLERY DELETE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Fotografija nije mogla biti obrisana.",
      },
      {
        status: 500,
      }
    );
  }
}