export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CameraLocation {
  name: string;
  coordinates: Coordinates;
}

export interface NetworkInfo {
  relatedCameras: string[];
  networkStatus: string;
}

export interface AdminUserInfo {
  userID: string;
  notificationStatus: string;
}

export interface ResolutionQuality {
  resolution: string;
  quality: string;
}
