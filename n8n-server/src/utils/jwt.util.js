import jwt from "jsonwebtoken";

const jwtSign = (data, secret, expires) => jwt.sign(data, secret, { expiresIn: expires });

// Function to encode data into a two-layered JWT
export const jwtEncode = (data, secret, expires) => {
  // First JWT
  const firstToken = jwtSign(data, secret, expires);

  // Extract parts of the JWT
  const [header, payload, signature] = firstToken.split(".");

  // Create second-level data and signature
  const secondSecret = signature; // Use the third part (signature) as the secret
  const secondData = `${payload}.${header}`; // Swap header and payload positions

  // Second JWT signed using the new secret
  const secondToken = jwtSign({ data: secondData }, secondSecret, expires);

  // Return the combined second-layered token
  return `${secondSecret}.${secondToken}`;
};

// Utility function to decode a two-layered JWT
export const jwtDecode = (token, secret) => {
  try {
    // Split the token parts only once
    const [secondSecret, part1, part2, part3] = token.split(".");

    // Reconstruct the second layer token
    const secondDataEncoded = `${part1}.${part2}.${part3}`;
    const secondDataDecoded = jwt.verify(secondDataEncoded, secondSecret);

    // Extract and reconstruct the first layer data
    const secondData = secondDataDecoded.data;
    const [payload, header] = secondData.split(".");
    const dataEncoded = `${header}.${payload}.${secondSecret}`;

    // Verify the first layer data with the original secret
    const dataDecoded = jwt.verify(dataEncoded, secret);
    return dataDecoded;
  } catch (_err) {
    return null;
  }
};
