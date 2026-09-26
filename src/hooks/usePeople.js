import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/axios";
import { TMDB_ENDPOINTS } from "../api/endpoits";

export const usePersonDetails = (id) => {
    return useQuery({
        queryKey: ["person-details", id],
        queryFn: () => fetchData(TMDB_ENDPOINTS.PERSON_DETAILS(id)),
        enabled: !!id,
    });
};

export const usePersonCredits = (id) => {
    return useQuery({
        queryKey: ["person-credits", id],
        queryFn: () => fetchData(TMDB_ENDPOINTS.PERSON_CREDITS(id)),
        enabled: !!id,
    });
};