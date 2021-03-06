export default function PostPet(context) {
    let appId = context.evaluateTargetPath('#Application/#ClientData/MobileServiceAppId');
    // POST "https://petstore.swagger.io/v2/pet" -H "accept: application/json" -H "Content-Type: application/json"
    let destination = 'swagger.petstore';
    let relativePath = 'pet';
    let requestPath = destination + '/' + relativePath;
    //Retrieve the individual input values from Pet_Create page and store them in local variables  
    let petCategory = context.evaluateTargetPath('#Page:Pet_Create/#Control:FCCreateCategory/#Value');
    let petName = context.evaluateTargetPath('#Page:Pet_Create/#Control:FCCreatePet/#Value');
    let petTag = context.evaluateTargetPath('#Page:Pet_Create/#Control:FCCreateTag/#Value');
    let petStatus = context.evaluateTargetPath('#Page:Pet_Create/#Control:FCCreateStatus/#Value');
    let requestBodyJSON = {
        "category": {
            "name": petCategory
        },
        "name": petName,
        "tags": [{
            "name": petTag
        }],
        "status": petStatus
    }
    let params = {
        'method': 'POST',
        'header': {
            'x-smp-appid': appId,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(requestBodyJSON)
    };
    return context.sendRequest(requestPath, params).then((response) => {
        if (response.statusCode == 200) {
            alert(response.content.toString());
        } else {
            alert('something went wrong');
        }

    });
}