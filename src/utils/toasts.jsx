import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

export const notifySuccess = (title, message = null) =>
  toast.success(
    <div>
      <p className="font-semibold text-sm">{title}</p>
      {message ? <p className="text-xs text-gray-400">{message}</p> : null}
    </div>,
    {
      position: "bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    }
);

export const notifyError = (title, message = null) =>
  toast.error(
    <div>
      <p className="font-semibold text-sm">{title}</p>
      {message ? <p className="text-xs text-gray-400">{message}</p> : null}
    </div>,
    {
      position: "bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    }
);

export const notifyWarning = (title, message = null) =>
  toast.warn(
    <div>
      <p className="font-semibold text-sm">{title}</p>
      {message ? <p className="text-xs text-gray-400">{message}</p> : null}
    </div>,
    {
      position: "bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    }
);

export const notifyInfo = (title, message = null) =>
  toast.info(
    <div>
      <p className="font-semibold text-sm">{title}</p>
      {message ? <p className="text-xs text-gray-400">{message}</p> : null}
    </div>,
    {
      position: "bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    }
);

export const notify = (title, message = null) =>
  toast(
    <div>
      <p className="font-semibold text-sm">{title}</p>
      {message ? <p className="text-xs text-gray-400">{message}</p> : null}
    </div>,
    {
      position: "bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    }
);