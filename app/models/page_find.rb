class PageFind


  def self.find_on_linkedin(contact)
    # bring back li's
# make an array containing the parsed peices that will be used to make our li's

    names = self.name.split(' ')
    name1 = names[0]
    name2 = names[1]
    agent = Mechanize.new
    page = agent.get("http://www.linkedin.com/pub/dir/#{name1}/#{name2}")
    
    li_list = page.search('li.vcard')

    profiles = []
    li_list.each do |li|

      item = []

      name = li.search("h2")
      item.push name.text.gsub("\n","")

      imagearr = li.search("a img").map{|img| img['src']}
      image_url = imagearr.join
      item.push(image_url)

      linkarr = li.search('h2 a').map{|link| link['href']}
      page_url = linkarr.join
      item.push(page_url)

      location = li.search(".location").text.gsub("\n","")
      item.push(location)

      job_title = li.search(".title").text.gsub("\n","")
      item.push(job_title)
      

      profiles.push(item)
    end
    return profiles
  end

end

