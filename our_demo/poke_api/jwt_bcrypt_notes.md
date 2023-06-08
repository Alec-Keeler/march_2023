encode - not secure
encrypt - more secure, requires (at least one) secret key
hash - cannot be reverse engineered, output is predicatble
    'password + randomsalt' 'adflkjahsdlkfjaherkltjdsgi23up5487ersdg'
    'password + randomsalt' 'dsfa;lsdjfasdf'
    'password + randomsalt' 'adflkjahsdlkffa;sdofa'sdferhjaherkltjdsgi23up5487ersdg'
    'password + randomsalt' 'adflkjahsdlkfjaherkltjdsgi23up5487erstrdfghdfgdg'
    'password + randomsalt' 'adflkjahsdlkfjaherkltjdsgi23dfghdfghdup5487ersdg'
    

jwt
    header - type or jwt/token, alg used to hash signature
    payload - data we want store, claims
    signature - base64 encoded(header + payload )+ secretKey >>hashed

    