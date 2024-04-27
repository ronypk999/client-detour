import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import PopupLinkAccount from "./PopupLinkAccount";

export default function PopupProvider() {
  const { token, setToken } = useContext(AuthContext);

  return (
    <div className="mx-auto w-fit">
      <div
        className={`fixed z-[100] flex items-center justify-center ${
          token ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`text- absolute max-w-md rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${
            token
              ? "scale-1 opacity-1 duration-300"
              : "scale-0 opacity-0 duration-150"
          }`}
        >
          <h1 className="mb-2 text-xl font-semibold">
            You already have an account with {token && token.email}.
          </h1>
          <p className="text-base">
            Please login via other method to link with existing account
          </p>
          <div className="space-y-3 py-6">
            {token &&
              token.customData._tokenResponse.verifiedProvider.map(
                (providerName, index) => {
                  return (
                    <PopupLinkAccount
                      key={index}
                      providerName={providerName}
                    ></PopupLinkAccount>
                  );
                }
              )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setToken(null)}
              className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
