import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination";
import prisma from "../../lib/prisma";

interface GetEventQuery extends PaginationQueryParams {
  search: string;
  location: string;
}

export const getEventsService = async (query: GetEventQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search, location } = query;

    const whereClause: Prisma.EventWhereInput = {};

    if (search) {
      whereClause.OR = [{ title: { contains: search, mode: "insensitive" } }];
    }

    if (location) {
      whereClause.OR = [
        { location: { contains: location, mode: "insensitive" } },
      ];
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        user: true,
        eventCategory: true,
      },
    });

    const count = await prisma.event.count({ where: whereClause });
    return {
      data: events,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
