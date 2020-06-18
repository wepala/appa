# Environment Variables 

## Brief recap:
An environment variable  or EnVar, is a variable whose value is set outside the main code of a program, it is made up of a name/value pair.
   - eg: ```SENDER=username@email.com ```
During initialization or at runtime, refrences to these keys in the code are replaced with its current value
 
> If you are unfamilure with environment variables you can read more here [using-environment-variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables)

Environment variables can be defined for a step, job, or entire workflow. see [Workflow syntax for GitHub](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv)

## Setting Custom EnVars
- Note that Environment variables are case-sensitive.  

To set new custom EnVars, you will need to specify the variables in the workflow [file](.github/workflows/ci.yml). 

## Our EnVars

For WEAgenda Required Variables include: 

### Support 
- SUPPORT_URL=
  > the endpoint used by weagenda to send support request via our api 
- SENDER=
  > the verified email address sending the support request
- DESTINATION=
  > the destination app email address based on the type of request being sent 

### Pipeline 
Appa currently uses a roadmap based pipeline to share with WEOS users upcoming features
- ROADMAP_ID= 
   > the id to a spicific roadmap 
- PIPELINE_URL= 
   > the url leading to the page where the pipeline is displayed  

### Auth 
- CLIENT_ID= 
   >
- AUTHORIZE_URL= 
   >
- REDIRECT_URI= 
   >
- RESPONSE_TYPE= 
   >
- SCOPE= 
   >
- CODE_CHALLENGE_METHOD= 
   >
- BEARER= 
   >
