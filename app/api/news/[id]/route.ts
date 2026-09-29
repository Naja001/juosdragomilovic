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
  { params }: RouteProps
) {
  try {
    /*
     * 1. Provjera Firebase tokena
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

    /*
     * 2. ID novosti
     */
    const { id } =
      await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "ID novosti nije pronađen.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * 3. Učitaj dokument
     */
    const documentReference =
      adminDb
        .collection("news")
        .doc(id);

    const snapshot =
      await documentReference.get();

    if (!snapshot.exists) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Novost nije pronađena.",
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
     * 4. Obriši sliku sa cPanela
     */
    if (imageUrl) {
      try {
        const deleteResponse =
          await fetch(
            "https://www.os-dragomilovic.com/api/delete-news-image.php",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                imageUrl,
              }),

              cache: "no-store",
            }
          );

        const deleteText =
          await deleteResponse.text();

        console.log(
          "CPANEL DELETE RESPONSE:",
          deleteText
        );

        if (!deleteResponse.ok) {
          console.error(
            "Slika nije obrisana sa cPanela:",
            deleteText
          );
        }
      } catch (error) {
        /*
         * Ne prekidamo brisanje Firestore
         * dokumenta samo zato što je
         * cPanel delete imao problem.
         */
        console.error(
          "CPANEL IMAGE DELETE ERROR:",
          error
        );
      }
    }

    /*
     * 5. Obriši Firestore dokument
     */
    await documentReference.delete();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "NEWS DELETE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Novost nije mogla biti obrisana.",
      },
      {
        status: 500,
      }
    );
  }
}