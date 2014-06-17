class PageFind


  def self.find_on_linkedin(contact)
    # bring back li's
# make an array containing the parsed peices that will be used to make our li's

    names = self.name.split(' ')
    name1 = names[0]
    name2 = names[1]
    agent = Mechanize.new
    page = agent.get("http://www.linkedin.com/pub/dir/#{name1}/#{name2}")
    results = []
    li_list = page.search('li.vcard')
    link_list = li_list.search('h2 a').map{|link| link['href']}
    img_list = li_list.search("a img").map{|img| img['src']}

    profiles = []
    li_list.each do |li|

      item = []

      name = li.search("h2")
      item.push name.text

      imagearr = li.search("a img").map{|link| link['href']}
      image_url = imagearr.join
      item.push(image_url)

      location = li.search(".location").text.gsub("\n","")
      item.push(location)
      

      profiles.push(item)
    
  end

end

