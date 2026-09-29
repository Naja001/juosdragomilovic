import { NextResponse } from "next/server";

import {
  adminAuth,
  adminDb,
} from "@/lib/firebase-admin";

export async function POST(
  request: Request
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

    const decodedToken =
      await adminAuth.verifyIdToken(
        token
      );

    const body =
      await request.json();

    const {
      title,
      description,
      category,
      publishedAt,
      fileUrl,
      fileName,
    } = body;

    if (
      !title ||
      !category ||
      !publishedAt ||
      !fileUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Nedostaju obavezna polja.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      category !== "document" &&
      category !== "procurement"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Neispravna kategorija dokumenta.",
        },
        {
          status: 400,
        }
      );
    }

    const documentReference =
      await adminDb
        .collection("documents")
        .add({
          title:
            title.trim(),

          description:
            typeof description ===
              "string"
              ? description.trim()
              : "",

          category,

          publishedAt,

          fileUrl,

          fileName:
            fileName ?? "",

          authorId:
            decodedToken.uid,

          authorEmail:
            decodedToken.email ??
            null,

          createdAt:
            new Date(),

          updatedAt:
            new Date(),
        });

    return NextResponse.json({
      success: true,
      id:
        documentReference.id,
    });
  } catch (error) {
    console.error(
      "DOCUMENT CREATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Dokument nije mogao biti sačuvan.",
      },
      {
        status: 500,
      }
    );
  }
}