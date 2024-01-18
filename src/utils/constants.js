
export const payerTypeValues = {
  0: "Insurer",
  1: "TPA",
  2: "PRA",
};

export const genderMap = {
  M: "Male",
  F: "Female",
  // Add more mappings if needed
};

export const claimTypesMap = {
  I : "Institutional",
  D : "Dental",
  R : "Pharmacy",
  P : "Professional",
}

export const episodeStatusMap = {
  0 : "Valid",
  1 : "Valid & Closed manually",
  9 : "Voided",
}

export const episodeTypeMap= {
  S : "SRF",
  A : "Acute",
  C : "Chronic",
  P : "Procedural",
  O : "Other"
}

export const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${month}-${day}-${year}`;
}


