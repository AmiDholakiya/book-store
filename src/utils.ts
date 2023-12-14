export function dec2hex (dec:any) {
    return dec.toString(16).padStart(2, "0")
  }

export function generateId (len: any) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }

  // export function convertFormStateToBookType(formState: FormState | undefined): BookType {
  //   const book: BookType = {
  //     id: formState?.id as string, // Assuming id is a required string in BookType
  //     name: formState?.name,
  //     price: parseFloat(formState?.price || "0.0"), // Convert to number
  //     category: formState?.category,
  //     description: formState?.description,
  //   };
  
  //   return book;
  // }