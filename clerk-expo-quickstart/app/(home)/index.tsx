import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SignOutButton } from '@/app/components/SignOutButton';
import { styles } from './styles'; // o usar StyleSheet.create directamente

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <SignedIn>
        <Text style={styles.text}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <Text style={styles.text}>
          Welcome! 🙃
        </Text>
        <Link href="/(auth)/sign-in">
          <Text style={[styles.link, styles.signIn]}>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text style={styles.link}>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
