import { MapTypeExtended } from "./_index";

export interface PlatformGenerator {
    generate: () => MapTypeExtended[]
}