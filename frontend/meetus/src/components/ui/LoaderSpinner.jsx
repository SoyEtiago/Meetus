import { Loader2 } from "lucide-react"


function LoaderSpinner ({size}) {
  return (
      <div className="w-screen h-full d-flex items-center justify-center">
        <Loader2 className="animate-spin w-full" size={size}/>
      </div>
    );
}


export {LoaderSpinner}