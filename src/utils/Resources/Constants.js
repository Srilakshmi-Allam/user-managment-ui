import apiClient from "../../api/axios";

export const fieldApiMapping = {
    primary_diagnosis_code: "/episodeCodeSetsDiag",
    any_diagnosis_code: "/episodeCodeSetsDiag",
    service_code: "/episodeCodeSetsCPT",
    drg_code: "episodeCodeSetsDrg",
    hcpcs_code: "episodeCodeSetsHcpc",
    principal_procedure_code: "episodeCodeSetsProc",
    any_procedure_code: "episodeCodeSetsProc",
    rx_code: "episodeCodeSetsRx",
    revenue_code: "/episodeCodeSetsRev",
};

const fetchData = async (field) => {
    try {
        const response = await apiClient.get(fieldApiMapping[field]);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export default fetchData;