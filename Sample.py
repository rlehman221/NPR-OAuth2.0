import urllib
import requests, json

def getLoginlink():
    baseurl = "https://api.npr.org/authorization/v2/authorize"
    qsdict = {'client_id': 'nprone_trial_Jkfw5AVwNSjh',
              'state': 'eft68jrd3r74fpc7Grni',
              'redirect_uri': 'https://www.pubnub.com',
              'response_type': 'code',
              'scope': 'localactivation'}
    return "%s?%s" % (baseurl, urllib.parse.urlencode(qsdict))

print("go to the following url on the browser and enter the code from the returned url: ")
print("---  " + getLoginlink() + "  ---")
authorization_code = input('code: ')

print(authorization_code)

data = {'grant_type': 'authorization_code',
        'client_id': 'nprone_trial_Jkfw5AVwNSjh',
        'client_secret': 'pT7GqjilFKWOdeP4RH5RFqE5Lwb7OYu8Rx8FciCC',
        'code': authorization_code,
        'redirect_uri': "https://www.pubnub.com"}
print("requesting access token")
access_token_response = requests.post('https://api.npr.org/authorization/v2/token?', data=data)

print("response")
print(access_token_response)
print('body: ' + access_token_response.text)
