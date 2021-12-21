function isRequired (element) {
    if(!element.trim())
    {
        return "This field is required";
    }
    else
    {
        return null;
    }
}

function isNumber (element) {
    if(isNaN(element))
    {
        return "Please enter only numerical values (0-9)";
    }
    else
    {
        return null;
    }
}

function isEmail (element) {
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(element))
    {
        return "Please enter a valid email address";
    }
    else
    {
        return null;
    }
}

function isAlphaText (element) {
    if(!/^[A-Z ]+$/i.test(element))
    {
        return "Please enter only alphabetical letters (A-Z, a-z)";
    }
    else
    {
        return null;
    }
}

function isAlphaWord (element) {
    if(!/^[A-Z]+$/i.test(element))
    {
        return "Please enter only alphabetical letters (A-Z, a-z) and enter only one word";
    }
    else
    {
        return null;
    }
}

function isAlphaNumberic (element) {
    if(!/^[A-Z0-9]+$/i.test(element))
    {
        return "Please enter only alphanumeric characters (A-Z, a-z, 0-9) and enter only one word";
    }
    else
    {
        return null;
    }
}

function isMobileNumber (element) {
    if(!/^[0-9]+$/i.test(element))
    {
        return "Please enter only numerical values (0-9)";
    }
    else
    {
        return null;
    }
}

function isMobileNumber11Digits (element) {
    if(element.length !== 11)
    {
        return "Mobile Number must be 11 digits long";
    }
    else
    {
        return null;
    }
}

function isMobileNumberStartingWith0 (element) {
    if(!element.startsWith("0"))
    {
        return "Mobile Number must start with 0";
    }
    else
    {
        return null;
    }
}

function isImage (element) {
    if(!/^\/uploads+\\[A-Z0-9 ()]+\.[A-Z0-9]{3,4}$/i.test(element) && !/^[A-Z]{1}+\:\\+[A-Z0-9\\ ()-]+\.[A-Z0-9]{3,4}$/i.test(element) && element.indexOf("\\\\") !== -1)
    {
        return "Please enter a valid image path";
    }
    else
    {
        return null;
    }
}

function isPromotionBanner (element) {
    var ids = []
    var images = []

    var arr = element.split(";").map(item => item.trim());
    if(arr.length !== 3)
    {
        return "Please enter 3 Banners (3 id and image combo)";
    }
    else
    {
        for (const arrElement of arr)
        {
            items = arrElement.split(",").map(item => item.trim());
            ids.push(items[0]);
            images.push(items[1]);
        }
        if(ids.length !== 3)
        {
            return "Please enter 3 ids";
        }
        if(images.length !== 3)
        {
            return "Please enter 3 Images";
        }
        for(const index in ids)
        {
            var err = isAlphaNumberic(ids[index]);
            if(err)
            {
                return `Id #${Number(index) + 1} is invalid`;
            }
        }
        for(const index in images)
        {
            var err = isImage(images[index]);
            if(err)
            {
                return `Image #${Number(index) + 1} is invalid`;
            }
        }
    }
    return null;
}

export {isRequired, isNumber, isEmail, isAlphaText, isAlphaWord, isAlphaNumberic, isMobileNumber, isMobileNumber11Digits, 
    isMobileNumberStartingWith0, isImage, isPromotionBanner}