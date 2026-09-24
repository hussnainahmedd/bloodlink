import {
  Fraunces_400Regular,
  Fraunces_500Medium,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  useFonts,
} from '@expo-google-fonts/fraunces';
import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

/**
 * Loads every weight the theme references. Keys MUST match the family
 * names in styles/theme.ts (`fonts.*`):
 *   Fraunces-Regular / -Medium / -SemiBold / -Bold
 *   Inter-Regular    / -Medium / -SemiBold / -Bold
 *   PlexMono-Regular / -Medium / -SemiBold
 *
 * Returns [loaded, error] in the expo-font useFonts convention.
 */
export function useAppFonts(): [boolean, Error | null] {
  return useFonts({
    'Fraunces-Regular': Fraunces_400Regular,
    'Fraunces-Medium': Fraunces_500Medium,
    'Fraunces-SemiBold': Fraunces_600SemiBold,
    'Fraunces-Bold': Fraunces_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'PlexMono-Regular': IBMPlexMono_400Regular,
    'PlexMono-Medium': IBMPlexMono_500Medium,
    'PlexMono-SemiBold': IBMPlexMono_600SemiBold,
    // PlexMono has no -Bold weight loaded; theme never references one.
    'PlexMono-Bold': IBMPlexMono_700Bold,
  });
}
