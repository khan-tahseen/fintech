import { ExpoResponse, ExpoRequest } from 'expo-router/server';

export async function GET(request: ExpoRequest) {
  return ExpoResponse.json({
    message: 'Hello from API!',
  });
}
