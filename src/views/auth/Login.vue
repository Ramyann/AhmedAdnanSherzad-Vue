<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">
        Login to your account
      </h2>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            :disabled="isLoading"
            class="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="you@example.com"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              :disabled="isLoading"
              class="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2 pr-10 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="••••••••"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              :disabled="isLoading"
            >
              <svg
                v-if="showPassword"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>

        <!-- Remember me + Forgot -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              v-model="remember"
              :disabled="isLoading"
              class="rounded border-gray-300 disabled:cursor-not-allowed"
            />
            Remember me
          </label>
          <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isLoading || !email || !password"
          class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          <svg
            v-if="isLoading"
            class="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <!-- Divider -->
      <div class="mt-6 flex items-center">
        <div class="flex-grow h-px bg-gray-200"></div>
        <span class="px-3 text-sm text-gray-500">or</span>
        <div class="flex-grow h-px bg-gray-200"></div>
      </div>

      <!-- Alternative -->
      <div class="mt-6">
        <button
          type="button"
          :disabled="isLoading"
          @click="handleGoogleLogin"
          class="w-full py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            class="h-5 w-5"
          />
          Continue with Google
        </button>
      </div>

      <!-- Sign up link -->
      <div class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <a href="#" class="text-blue-600 hover:underline font-medium">
          Sign up
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const remember = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

async function handleLogin() {
  if (!email.value || !password.value) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Login submitted:", {
      email: email.value,
      password: password.value,
      remember: remember.value,
    });

    // TODO: Replace with actual API call
    // const response = await loginAPI({
    //   email: email.value,
    //   password: password.value,
    //   remember: remember.value
    // });

    // Success - redirect or emit event
    // router.push('/dashboard');
    
  } catch (error) {
    errorMessage.value = "Invalid email or password. Please try again.";
    console.error("Login error:", error);
  } finally {
    isLoading.value = false;
  }
}

function handleGoogleLogin() {
  console.log("Google login clicked");
  // TODO: Implement Google OAuth
}
</script>