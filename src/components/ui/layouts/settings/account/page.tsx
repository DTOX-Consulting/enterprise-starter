import { Button } from '@/components/ui/atoms/button';
import { ContainerAnimated } from '@/components/ui/atoms/container';
import { Input } from '@/components/ui/atoms/input';
import { UserImage } from '@/components/ui/organisms/user/image';
import { getUserSession } from '@/lib/sdks/kinde/api/session';
import { ManageSubscriptionButton } from '@/lib/sdks/stripe/client/checkout';
import { ucFirst } from '@/lib/utils/string';

export const dynamic = 'force-dynamic';

async function PersonalInformationForm() {
  const { user } = await getUserSession();

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 pt-8 md:grid-cols-3 lg:pt-0">
      <div>
        <h2 className="text-base font-semibold leading-7">Personal Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-4">
          Use a permanent address where you can receive mail.
        </p>
      </div>
      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full flex items-center gap-x-8">
            <UserImage user={user} width={64} height={64} className="size-16 sm:flex" />
            <div>
              <Button disabled>Change avatar</Button>
              <p className="mt-2 text-xs leading-5 text-gray-4">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6">
              First name
            </label>
            <div className="mt-2">
              <Input
                disabled
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                value={user.firstName}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6">
              Last name
            </label>
            <div className="mt-2">
              <Input
                disabled
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                value={user.lastName}
              />
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="email" className="block text-sm font-medium leading-6">
              Email address
            </label>
            <div className="mt-2">
              <Input
                disabled
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={user.email}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex">
          <Button disabled>Save</Button>
        </div>
      </form>
    </div>
  );
}

export function _ChangePasswordForm() {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 pt-8 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">Change password</h2>
        <p className="mt-1 text-sm leading-6 text-gray-4">
          Update your password associated with your account.
        </p>
      </div>
      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="current-password" className="block text-sm font-medium leading-6">
              Current password
            </label>
            <div className="mt-2">
              <input
                id="current-password"
                name="current_password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-5 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="new-password" className="block text-sm font-medium leading-6">
              New password
            </label>
            <div className="mt-2">
              <input
                id="new-password"
                name="new_password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-5 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6">
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-5 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

export function _LogoutOtherSessionsForm() {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 pt-8 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">Log out other sessions</h2>
        <p className="mt-1 text-sm leading-6 text-gray-4">
          Please enter your password to confirm you would like to log out of your other sessions
          across all of your devices.
        </p>
      </div>
      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="logout-password" className="block text-sm font-medium leading-6">
              Your password
            </label>
            <div className="mt-2">
              <input
                id="logout-password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-5 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex">
          <Button type="submit">Log out other sessions</Button>
        </div>
      </form>
    </div>
  );
}

function DeleteAccountForm() {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 pt-8 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">Delete account</h2>
        <p className="mt-1 text-sm leading-6 text-gray-4">
          No longer want to use our service? You can delete your account here. This action is not
          reversible. All information related to this account will be deleted permanently.
        </p>
      </div>
      <form className="flex items-center md:col-span-2">
        <Button disabled variant="destructive">
          Yes, Delete my account
        </Button>
      </form>
    </div>
  );
}

async function CurrentSubscriptionInformation() {
  const { subscription } = await getUserSession();

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 pt-8 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">Subscription Tier</h2>
        <p className="mt-1 text-sm leading-6 text-gray-4">
          View your current subscription tier and upgrade or downgrade anytime.
        </p>
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-2 text-lg font-bold">
              <span>{ucFirst(subscription.tier)} </span>
              <span className="text-sm leading-6 text-gray-4">(billed monthly)</span>
            </h3>

            <ManageSubscriptionButton tier={subscription.tier} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsAccountPage() {
  return (
    <ContainerAnimated size="no-padding" className="flex grow flex-col">
      <h1 className="sr-only">Account Settings</h1>
      <div className="divide-y divide-white/5">
        {<PersonalInformationForm />}
        {<CurrentSubscriptionInformation />}
        {<DeleteAccountForm />}
      </div>
    </ContainerAnimated>
  );
}
