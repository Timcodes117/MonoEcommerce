

// useEffect(() => {
    (
        function(){
            
        }
    )();

//   }, []);
export class Animatedmessage{

    isVisible = false;

    messages = ""


    alertNew(message: string, type: any){
        this.isVisible = true;
        this.messages = message
        
        const interval = setTimeout(() => {
            this.messages = message
            this.isVisible = false
            // return "close"
            console.log(this.isVisible, message)
          }, 5000);
          

          return () => clearTimeout(interval);

    }
}