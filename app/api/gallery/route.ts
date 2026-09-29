import {
  NextResponse,
} from "next/server";

import {
  adminAuth,
  adminDb,
} from "@/lib/firebase-admin";

export async function POST(
  request: Request
) {
  try {
    /*
     * AUTH
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

    const decodedToken =
      await adminAuth.verifyIdToken(
        token
      );

    /*
     * BODY
     */
    const body =
      await request.json();

    const {
      title,
      description,
      imageUrls,
    } = body;

    /*
     * VALIDATION
     */
    if (
      typeof title !==
        "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Naslov je obavezan.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Array.isArray(
        imageUrls
      ) ||
      imageUrls.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Potrebna je najmanje jedna fotografija.",
        },
        {
          status: 400,
        }
      );
    }

    const validImageUrls =
      imageUrls.filter(
        (
          imageUrl
        ): imageUrl is string =>
          typeof imageUrl ===
            "string" &&
          imageUrl.trim()
            .length > 0
      );

    if (
      validImageUrls.length !==
      imageUrls.length
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Jedan ili više URL-ova fotografija nije ispravan.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * FIRESTORE BATCH
     */
    const batch =
      adminDb.batch();

    const ids: string[] =
      [];

    const now =
      new Date();

    validImageUrls.forEach(
      (imageUrl) => {
        const documentReference =
          adminDb
            .collection(
              "gallery"
            )
            .doc();

        ids.push(
          documentReference.id
        );

        batch.set(
          documentReference,
          {
            title:
              title.trim(),

            description:
              typeof description ===
                "string"
                ? description.trim()
                : "",

            imageUrl:
              imageUrl.trim(),

            authorId:
              decodedToken.uid,

            authorEmail:
              decodedToken.email ??
              null,

            createdAt:
              now,

            updatedAt:
              now,
          }
        );
      }
    );

    await batch.commit();

    return NextResponse.json({
      success: true,
      ids,
      count: ids.length,
    });
  } catch (error) {
    console.error(
      "GALLERY CREATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Fotografije nisu mogle biti sačuvane.",
      },
      {
        status: 500,
      }
    );
  }
}