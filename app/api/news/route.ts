import { NextResponse } from "next/server";

import {
  adminAuth,
  adminDb,
} from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    // Provjera Firebase tokena
    const authorization =
      request.headers.get("authorization");

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Niste autorizovani.",
        },
        {
          status: 401,
        }
      );
    }

    const token = authorization.replace(
      "Bearer ",
      ""
    );

    const decodedToken =
      await adminAuth.verifyIdToken(token);

    // Podaci iz forme
    const body = await request.json();

    const {
      title,
      excerpt,
      content,
      publishedAt,
      imageUrl,
      category,
    } = body;

    // Validacija
    if (
      !title ||
      !excerpt ||
      !content ||
      !publishedAt ||
      !category
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Nedostaju obavezna polja.",
        },
        {
          status: 400,
        }
      );
    }

    // Dozvoljene kategorije
    if (
      category !== "school" &&
      category !== "eco"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Neispravna kategorija novosti.",
        },
        {
          status: 400,
        }
      );
    }

    // Firestore
    const documentReference =
      await adminDb
        .collection("news")
        .add({
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          publishedAt,

          category,

          imageUrl:
            typeof imageUrl === "string" &&
            imageUrl.trim()
              ? imageUrl.trim()
              : null,

          authorId: decodedToken.uid,

          authorEmail:
            decodedToken.email ?? null,

          createdAt: new Date(),
          updatedAt: new Date(),
        });

    return NextResponse.json({
      success: true,
      id: documentReference.id,
    });
  } catch (error) {
    console.error(
      "NEWS CREATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Novost nije mogla biti sačuvana.",
      },
      {
        status: 500,
      }
    );
  }
}